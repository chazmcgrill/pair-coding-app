const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const morgan = require('morgan');

// Models
const Message = require('./models/messages');
const Conversation = require('./models/conversations');
const User = require('./models/user');

// Routes
const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');
const conversations = require('./routes/conversations');
const messages = require('./routes/messages');
const languages = require('./routes/languages');

// database setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// app setup
app.use(morgan('tiny'));
app.use(express.json({type: '*/*'}));
app.use(passport.initialize());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

// sockets setup
let server = http.createServer(app);
const io = socketio(server)
app.set('socketio', io);
// var people = [];


// Want to move out to own file
function connection(socket) {
    console.log('socketID: ', socket.id);

    // Potential user online stuff.
    // socket.on("join", (name) => {
    //     const user = {
    //         userId: 'name',
    //         socket: socket.id,
    //     }
    //     people.push(user);
    //     console.log(people)
    // });
    
    // socket.on('disconnect', (socket) => {
    //    people = people.filter(function( obj ) {
    //     return obj.userId !== socket.id;
    //   });
    //   console.log(people)
    // });

     // Create Conversation
     socket.on('MAKE_CONVERSATION', (data) => {
         console.log('Making message: ', socket.id);
         const { roomId, recievingUser, sendingUser} = data;
         const { githubId, name, photo } = sendingUser;
         const { userId, username, avatar } = recievingUser;
         const message = 'Someone wants to connect with you.';

         // Check if theres already a conversation between users
         // TODO, CHECK IF MESSAGES EXIST CREATE ONE IF NOT, OR ADD TO IT, IF IT DOES
         Conversation.find( { roomId } )
            .count()
            .then((count) => {
                    
                // if conversation doesnt exist make it
                if(!count) {
                    const newMessage = new Message({
                        roomId,
                        message: [{
                            userId: githubId,
                            username: name,
                            avatar: photo,
                            message,
                        }]
                    });
                    newMessage.save()
                        .then(message => console.log(message))
                        .catch(err => console.log(err))

                    
                    const newConversation = new Conversation({
                            roomId,
                            users: [
                                {
                                    userId: githubId,
                                    username: name,
                                    avatar: photo
                                },
                                {
                                    userId,
                                    username,
                                    avatar,
                                }
                            ],
                            lastMessage: message,
                        })
                        newConversation.save()
                            .then(convo => console.log(convo))
                            .catch(console.log('error posting conversation'))
                       
                        // Update the Users conversations
                        User.findOneAndUpdate({
                           githubId: githubId.toString()
                        },
                        { $push: { conversations: roomId } })
                                .then(res => console.log(res))
                                .catch(err => console.log(err));

                        User.findOneAndUpdate({
                            githubId: userId.toString()
                            },
                            { $push: { conversations: roomId } })
                                .then(res => console.log(res))
                                .catch(err => console.log(err));
            
                } 

                // if conversation exists then update it instead.
                else {
                    Message.findOneAndUpdate(
                            { roomId }, 
                            { $push: {
                                message: {
                                    userId: githubId,
                                    username: name,
                                    avatar: photo,
                                    message,
                                }
                            }})
                            .then(console.log(data))
                            .catch(err => console.log(err));

                    Conversation.findOneAndUpdate(
                        { roomId, },
                        {
                            unread: true,
                            lastMessage: message
                        })
                        .then(console.log('message sent'))
                        .catch(err => console.log(err));
                    
                    console.log('conversation exists')
                }
            })
    });

    // Send message
    socket.on('SEND_MESSAGE', (data) => {
        console.log('send message: ', socket.id);
        io.emit('RECEIVE_MESSAGE', data);

        
        // Update messages database
        Message.findOneAndUpdate(
            { roomId: data.room }, 
            { $push: { message: data  } })
            .then(console.log(data))
            .catch(err => console.log(err));

        // Update last message in conversations database
        Conversation.findOneAndUpdate(
            { roomId: data.room },
            {
                lastMessage: data.message,
                unread: true
            })
            .then(console.log('last message: ', data.message))
            .catch(err => console.log(err));;
    });

    socket.on('SEND_NOTIFICATION', (data) => {
        console.log('NOTIFICATION: ', data);
        io.emit('RECEIVE_NOTIFICATION', data);
    });
    

    // Mark post as read
    socket.on('MARK_READ', (data) => {

        console.log('markread id: ', socket.id);
        Conversation.findOneAndUpdate(
            { roomId: data.roomId },
            { unread: false  })
            .then(console.log('message read'))
            .catch(err => console.log(err));;
    });
        
    //     User.findOne({username: user.username})
    //         .then( (res) => {
    //             if(res) {
    //                 console.log('username taken')
    //                 io.emit('USER_TAKEN', res);
    //             }
    //             else {
    //             new User(user)
    //                 .save()
    //                 .then(() => io.emit('USER_ONLINE', user))
    //                 .catch(err => console.log(err));
    //             }
    //         });
    // });

}


io.on('connection', connection);




// routes setup
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversations);
app.use('/api/messages', messages);
app.use('/api/languages', languages);

// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});