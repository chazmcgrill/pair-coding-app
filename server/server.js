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

// Routes
const subjects = require('./routes/subjects');
const authRoutes = require('./routes/auth');
const conversations = require('./routes/conversations');
const messages = require('./routes/messages');

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


io.on('connection', (socket) => {
    console.log('socketID: ', socket.id);

    socket.on('subscribe', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
    });

    // socket.on('unsubscribe', function(room) {  
    //     console.log('leaving room', room);
    //     socket.leave(room); 
    // })

    // socket.on('send', data => {
    //     const socketId = socket.id;
    //     const resData = {...data, socketId}
    //     io.sockets
    //         .in(data.room)
    //         .emit('RECEIVE_MESSAGE', resData);
    // });


    // socket.on('CREATE_ROOM', data => {
    //     socket.join(data.room);
    // })


    // socket.on('SEND_NOTIFICATION', (socket) => {
    //     socket.broadcast.emit('NEW_MESSAGE');
    // })

     // Create Conversation
     socket.on('MAKE_CONVERSATION', (data) => {
         console.log(data);
        
         // Check if theres already a conversation between users
         // TODO, CHECK IF MESSAGES EXIST CREATE ONE IF NOT, OR ADD TO IT, IF IT DOES
         Conversation.find( { roomId: data.room} )
            .count()
            .then((count) => {
                
                const newMessage = new Message({
                    roomId: data.room,
                    message: {
                        user: 'come on user',
                        message: 'message about something.'
                    }
                });
                newMessage.save()
                    .then(message => console.log(message))
                    .catch(err => console.log(err))
                    
                // if conversation doesnt exist make it
                if(!count) {
                    const newConversation = new Conversation({
                            roomId: data.room,
                            users: [12312421,123124124]
                        })
                        newConversation.save()
                            .then(convo => console.log(convo))
                            .catch(console.log('error posting conversation'))
            
                } 
                else {
                    console.log('conversation exists')
                }
            })

         

        // Message.findOneAndUpdate(
        //     { roomId: data.room }, 
        //     { $push: { message: data  } })
        //     .then(console.log(data))
        //     .catch(err => console.log(err));

		// Conversation.findOneAndUpdate(
        //     { roomId: data.roomId },
        //     { unread: false  })
        //     .then(console.log('message read'))
        //     .catch(err => console.log(err));;
	});

    // Send message
    socket.on('SEND_MESSAGE', (data) => {
		console.log('Reached the server', data);
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

    socket.on('ONLINE', (data) => {
		console.log('usernamed id: ', socket.id);
		console.log(data);
		socket.join(data.room);
    });
    

    // Mark post as read
    socket.on('MARK_READ', (data) => {
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

    // socket.on('disconnect', () => {

    //     User.findOneAndRemove({ socketId: socket.id }, (err) => {
    //         if (err)
    //             console.log(err);
    //         else
    //             console.log('User Deleted!');
    //     });

      
    // });
});



// routes setup
app.use('/api/subjects', subjects);
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversations);
app.use('/api/messages', messages);

// server setup
const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});