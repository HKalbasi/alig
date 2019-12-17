import React from "react";
import { getFromApi } from "../api.mjs";
import Link from "next/link";

const FS = class extends React.Component {
  constructor () {
    super()
    this.state = { loaded: false }
  }
  async componentDidMount() {
    try{
      const res = await getFromApi(`objects/${this.props.tree}`);
      this.setState({ loaded: true, value: res});  
    }
    catch(e) {
      this.setState({ loaded: true, value: e.toString()});
    }
  }
  render () {
    if (!this.state.loaded) return <div>loading</div>
    const elems = this.state.value.data.map(x =>
      <div>
        <Link href={`/${x.ref}`}>{x.name}</Link>
      </div>
    )
    return <div>{elems}</div>
  }
};

export default FS;