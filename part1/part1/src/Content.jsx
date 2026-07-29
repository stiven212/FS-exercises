import Part from "./Part"
const Content = (props) => {
  return (
    <div>
      <Part {...props.parts[0]} />
      <Part {...props.parts[1]}/>
      <Part {...props.parts[2]}/>

    </div>
  )
}

export default Content