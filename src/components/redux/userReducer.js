

const initialState = {
    users: [
        {
          "name": "Shubert",
          "id": 1,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "Hacker",
          "id": 2,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        }
        ],
    totalCount: null,
    error: null
}

export const userReduser = ( state = initialState, action ) => {

    return state
}