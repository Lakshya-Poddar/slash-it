import React, { Component } from 'react'
import {getUser} from '../utils/Common'
export class HomePage extends Component {
    
    render() {
        const user=getUser();
        return (
            <div className="App-header">
                <h1 className="text-uppercase">HELLO {user?user.name:"Visitor"}</h1>
                {
                 
                }
            </div>
        )
    }
}

export default HomePage
