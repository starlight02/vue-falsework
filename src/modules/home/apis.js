export default {
    getTest: {
        url: '/user/{userId}/info/{id}?sb=ni&from=hhh',
        restful: true,
    },
    postTest: {
        url: '/user/{userId}/info/{id}',
        method: 'post',
        restful: true
    },
    putTest: {
        url: '/user/info',
        method: 'put'
    },
    deleteTest: {
        url: '/user/info',
        method: 'delete'
    }
};
