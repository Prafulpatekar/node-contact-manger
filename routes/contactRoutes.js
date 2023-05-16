const express = require('express');
const router = express.Router();
// import { rootUrl,port } from '../server';

router.route('/').get((req ,res)=>{
    res.status(200).json({ 
                data: [],
                message: "Get all contacts" 
            });
});

router.route('/').post((req ,res)=>{
    res.status(200).json({ 
                data: [],
                message: "Post contact" 
            });
});

router.route('/:id').get((req ,res)=>{
    res.status(200).json({ 
                data: [],
                message: `Get contact id: ${req.params.id}`
            });
});

router.route('/:id').put((req ,res)=>{
    res.status(200).json({ 
                data: [],
                message: `Put contact id: ${req.params.id}`
            });
});

router.route('/:id').delete((req ,res)=>{
    res.status(200).json({ 
                data: [],
                message: `Delete contact id: ${req.params.id}`
            });
});

module.exports = router;