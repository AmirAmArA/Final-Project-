import React from "react";
import Router from "./Router";
import Loading from "./Loading";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 3000);
    }

    render() {
        return this.state.isLoading ? < Loading / > : < Router / > ;
    }
}
export default App;