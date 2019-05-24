import React from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';




class ExamplePDFViewer extends React.Component{


    constructor(props) {
        super(props);
        this.state = {

            url: ""

    }

    }

    componentWillMount(){
        console.log("1")
        this.setState({
            url: this.props.url


    })
    }


    render() {
        console.log(this.state);
        return (


            <PDFViewer document={{
                url: this.state.url
            }}
                       scale="0.75"
            css="customViewer"/>


        );
    }
}

export default ExamplePDFViewer
