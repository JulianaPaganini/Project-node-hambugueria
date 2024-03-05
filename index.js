const express = require('express');
const uuid = require('uuid');
const port = 3001;
const app = express();
app.use(express.json());

const order = []

const logRequest = (request, response, next) => {

    console.log(`[${request.method}] - ${request.url}`);

    next();
  }

const checkId = (request, response, next) => {
    const { id } = request.params

    const index = order.findIndex(use => use.id === id)

    if(index < 0) {

        return response.status(404).json({message:"USE NOT FOUND"})     
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/order', logRequest, (request, response) => {

  
    return response.json(order)

})

app.post('/order', logRequest, (request, response) => {

    const { list, clienteName, price, status } = request.body
    const client = { id: uuid.v4(), list, clienteName, price, status:"em preparação"}
   
    order.push(client)

    return response.status(201).json(order)
  
})
app.put('/order/:id', checkId, logRequest, (request, response) => {

    const index = request.userIndex 
    const id = request.userId

    const { list, clienteName, price, status} = request.body

   
    const updated = { id, list, clienteName, price, status:"em preparação"}


   order [index] = updated

    return response.json(updated)
})

app.delete('/order/:id', checkId, logRequest, (request, response) => {

    const index = request.userIndex 
    const id = request.userId

    order.splice(index,1)

    return response.status(204).json()

})

app.get('/order/:id', checkId, logRequest, (request, response) => {

    const index = request.userIndex 
    const id = request.userId
    const { list, clienteName, price, status} = request.body

   

    const user =   { id, list, clienteName, price, status:"em preparação"}
   

       return response.json(user)

    })

    app.patch('/order/:id', checkId, logRequest, (request, response) => {

        const index = request.userIndex
        const id = request.userId
  
    const { list, clienteName, price, status} = request.body

   

    const updatedd = { id, list, clienteName, price, status:"pronto"}

   
    order.push(updatedd)
 

    return response.json(updatedd)
    })



app.listen(port, () => {

    console.log(`Server started on port ${port}`)
})



