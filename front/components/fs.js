import React from "react";
import { getFromApi } from "../api.mjs";

const FS = class extends React.Component { // you can't use stateless component because you need a state
  constructor () {
    super()
    this.state = { loaded: false }
  }
  async componentDidMount() {
    try{
      const res = await getFromApi(`objects/${this.props.tree}`);
      console.log(res);
      this.setState({ loaded: true, value: res});  
    }
    catch(e) {
      this.setState({ loaded: true, value: e});
    }
  }
  render () {
    if (!this.state.loaded) return <div>loading</div>
    return <div>{JSON.stringify(this.state.value)}</div>
  }
};

export default FS;