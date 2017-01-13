import React, {Component} from 'react';

class AboutText extends Component {
    render() {
        return <div>
            <p>A dead man's switch is a switch that is automatically operated if the human operator becomes incapacitated, 
            such as through death, loss of consciousness, or being bodily removed from control.</p>
            <p>This app allows you to set up a dead man switch for anything you want.</p>
            <p>You can create a switch to send an email or text message to someone after not hearing from you for a certain period of time.</p>
            <p>The possibilities are endless because of how configurable DeadManSwitch is. See below for examples.</p>
            <p>DeadManSwitch will send its alive pings via email or sms, or both.</p>
            <p>Checking in after triggering the counter will reset the counter back to 0.</p>
            <p>Messages are sent 10 minutes after the counter triggers the message.</p>
            <ul>
                <li><strong>Check Interval</strong>: How often you want DeadManSwitch to send you a check. (ex. every 24 hours, every week, etc.) Can be any time period.</li>
                <li><strong>Check Time Range</strong>: Time range that you want checks to happen in. This is used for very short Check Intervals to prevent a trigger while you are sleeping.</li>
                <li><strong>Check Method</strong>: Email, SMS, or both. If both DeadManSwitch will accept an alive ping from either method.</li>
                <li><strong>Trigger Interval</strong>: How long after the last missed check you want to add a trigger to the counter. (ex. trigger the counter 2 hours after missed check.)</li>
                <li><strong>Trigger Count</strong>: How many triggers before the switch is triggered.</li>
                <li><strong>Trigger Multiplier</strong>: Use this to increase the Trigger Interval after every increase of the counter. The scale is exponential. 
                (ex. interval is set to every 2 hours and multipler is 2, then next count won't be added until 4 hours after the last interval, then next 8 hours, etc.)</li>
                <li><strong>Vacation Delay</strong>: How long you want to turn DeadManSwitch off for when you are away. 
                If you are going on vacation for two weeks and won't be able to respond to pings then set this.</li>
                <li><strong>Email Addess</strong>: Email to send message to.</li>
                <li><strong>Phone Number</strong>: Phone number to send SMS to.</li>
                <li><strong>Subject</strong>: Subject of the message (email only).</li>
                <li><strong>Message</strong>: Message contents.</li>
            </ul>
            <h4>Simple example:</h4>
            <p>
              Lets say you want to set up a DeadManSwitch to send a file to someone if you disappear. 
              You want this file to be in their hands at most 24 hours after you disappear. If you always have your phone on you and you always have reception 
              you could, for example, set the Check Interval to 6 hours (making sure you also set a Time Range), set the Trigger Interval to 2 hour, and the 
              Trigger Count to 3. This means that if you miss a ping at 10am on Monday a trigger will be counted at 12pm, 2pm, and 4pm before the switch is triggered. 
              This gives you a total of 6 hours to check in after a missed ping. If you disappear right after a ping it will be 12 hours before DeadManSwitch triggers
              (6 hours till the next ping, and 6 hours until the message triggers).
              Your message will be sent at 4:10pm on Monday.
            </p>
            <h4>Complex example:</h4>
            <p>
              Lets say you want to set up a DeadManSwitch to send a file to someone if you disappear, but you want to minimize the chance of a false trigger. 
              You want this file to be in their hands at most 75 hours after you disappear. You don't always have your phone on you, or have spotty reception. 
              You could, for example, set the Check Interval to 24 hours (making sure you also set a Time Range), set the Trigger Interval to 4 hour, the 
              Trigger Count to 3, and the Trigger Multiplier to 2. This means that if you miss a ping at 10am on Monday a trigger will be counted at 2pm, 
              10pm, and 2pm the next day before the switch is triggered. This gives you a total of 28 hours to check in after a missed ping. If you disappear 
              right after a ping it will be 52 hours before DeadManSwitch triggers (24 hours till the next ping, and 28 hours until the message triggers).
              Your message will be sent at 2:10pm on Tuesday.
            </p>
        </div>;
    }
};

export default AboutText;