// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users', async(req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "items": [
                      {
                          "ItemId" : 11,
                          "name" : "날개 한 짝1",
                          "image" : "https://cdn2.thecatapi.com/images/aqs.jpg",
                          "price" : 100
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 12,
                          "name" : "날개 한 짝2",
                          "image" : "https://cdn2.thecatapi.com/images/6sm.jpg",
                          "price" : 300
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 13,
                          "name" : "날개 한 짝3",
                          "image" : "https://cdn2.thecatapi.com/images/6sm.jpg",
                          "price" : 500
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 14,
                          "name" : "날개 한 짝4",
                          "image" : "https://cdn2.thecatapi.com/images/6sm.jpg",
                          "price" : 100
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 15,
                          "name" : "날개 한 짝5",
                          "image" : "https://cdn2.thecatapi.com/images/6sm.jpg",
                          "price" : 200
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 16,
                          "name" : "날개 한 짝6",
                          "image" : "https://cdn2.thecatapi.com/images/6sm.jpg",
                          "price" : 300
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": false
                },
                {
                    "items": [
                      {
                          "ItemId" : 17,
                          "name" : "날개 한 짝7",
                          "image" : "https://cdn2.thecatapi.com/images/d9j.jpg",
                          "price" : 100
                      },
                  
                      ],
                    "currentPage": 1,
                    "totalPages" : 200,
                    "isLastPage": true
                },

                ])
                )
            })]