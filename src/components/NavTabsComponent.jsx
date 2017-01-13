import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AboutText from './AboutText.jsx';
import Login from './Login.jsx';

class NavTabsComponent extends Component {
    render() {
        return <Tabs selectedIndex={0}>
            <TabList>
                <Tab>Login</Tab>
                <Tab>About</Tab>
            </TabList>
            
            <TabPanel>
                <div>
                    <h2>Login</h2>
                    <p>Please enter your email address. This will act as your login, so do not forget what email you used.</p>
                    <p>We will send a login link to this email address whenever you want to login. You will have to click the link in the email in order to login.</p>
                    <Login
                        updateEmail={this.props.updateEmail}
                        createLogin={this.props.createLogin}
                        sendingLoginRequest={this.props.sendingLoginRequest}
                        email={this.props.email}
                    />
                </div>
            </TabPanel>
            
            <TabPanel>
                <AboutText />
            </TabPanel>
        </Tabs>;
    }
};

export default NavTabsComponent;