const Total = (props) => {

    const p = props.parts;
    let total = 0;
    p.forEach( value =>{
        console.log(value);
        total += value.exercises;
        console.log(total);
        return total;
    }) 
    // return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    return <p>Number of exercises {total}</p>

}

export default Total