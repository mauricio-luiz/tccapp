module.exports = (app, io) => {
    onlines = {};
    io.on('connection', (cliente) => {
        const { session } = cliente.handshake;
        const { usuario } = session;

        onlines[usuario.email] = { nome : usuario.nome, email : usuario.email, tipo : usuario.tipo };
        
        if(onlines[usuario.email].tipo != 'p'){
            cliente.emit('notify-onlines',  onlines[usuario.email]);
            cliente.broadcast.emit('notify-onlines', onlines[usuario.email]);
        }        

        cliente.on('send-server', (hashDaSala, msg) => {
            const novaMensagem = { email : usuario.email, sala : hashDaSala };
            const resposta = `<b>${usuario.nome}:</b> ${msg}<br>`;
            session.sala = hashDaSala;
            cliente.broadcast.emit('new-message', novaMensagem);
            io.to(hashDaSala).emit('send-client', resposta);
        });

        cliente.on('create-room', (hashDaSala) => {
            session.sala = hashDaSala;
            cliente.join(hashDaSala);
        });

        cliente.on('responder', (hashDaSala, aluno, questao, resposta) => {
            session.sala = hashDaSala;
            io.to(hashDaSala).emit('resposta', hashDaSala, aluno, questao, resposta);
        });

        cliente.on('terminei', (hashDaSala, aluno, resultado) => {
            session.sala = hashDaSala;
            io.to(hashDaSala).emit('terminou', hashDaSala, usuario.nome, resultado);
        });

        cliente.on('disconnect', () => {
            const { sala } = session;
            const resposta = `<b>${usuario.nome}</b> saiu`;
            delete onlines[usuario.email];
            session.sala = null;
            cliente.leave(sala);
            cliente.broadcast.emit('notify-offlines', usuario.email);
            io.to(sala).emit('send-client', resposta );
        });
    });
};
