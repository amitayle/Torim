import React, { useState, useEffect } from 'react'


const PlayGround = props => {

    const [a, setA] = useState()
    const [b, setB] = useState()
    const [c, setC] = useState()
    const [d, setD] = useState()

    const arr1 = [1,2,3,4,5];
    const arr2 = [1,2];

    const display = () => {
        const bnn = arr1.filter(n => {
            return !arr2.includes(n);
        });
        
        setA(bnn);
    }


    const get = () => {
      
    };

    useEffect(() => {
        display();
        get();

    }, [])
    return (
        <div>
            <h3>{a}</h3>
            <h3>{b}</h3>
            <h3>{c}</h3>
            <h3>{d}</h3>
        </div>

    );
};
export default PlayGround;