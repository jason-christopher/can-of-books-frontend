import { Component } from "react";

class About extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <div id="aboutUs">
        <article className="individual">
          <img src="https://avatars.githubusercontent.com/u/113792883?v=4" alt="Tracy pic" className="aboutUsPic"/>
          <section>
              <h5>Tracy Oakley</h5>
              <p>I have just completed a Software Developer Bootcamp from Code Fellows that focused on the MERN stack. And before that I was a US Naval Officer aboard the USS Nevada. I have transitioned my skills in project management and problem solving from the Navy to the software development domain. My interest in software began when I was in college, but when I was in the Navy, I got to create work packages. Work packages are like software projects as they require precise syntax, logic and complex coordination and these experiences with their many review and tests cycles, I found I really enjoyed. I have found even more enjoyment in building coding projects and bringing them to life. Hoping to find a role that deals with feature creation and products to improve user experience or gain exposure in refactoring legacy code bases.</p>
          </section>
        </article>
        <div className="line"></div>
        <article className="individual">
          <section>
            <h5>Jason Christopher</h5>
            <p>I’m an Air Force veteran and the spouse of an active-duty military member and I currently serve as an officer in the Air Forces Reserves. I’ve excelled in my military career becoming my squadron’s top instructor and the “Top Graduate” of multiple military training courses; however, I’m looking for a more stable career as a remote software engineer as it’s the best way I can support my wife’s continued success in the military. I’ve had experience as a leader and project manager in the Air Force and have test and evaluation experience working with Boeing’s software updates for the mission systems on our aircraft. I have an engineering background from college and I continue to use those analytical and technical skills in my day-to-day work. I hope I can be a good fit for a position at your company.</p>
          </section>
          <img src="https://avatars.githubusercontent.com/u/113613301?v=4" alt="Jason pic" className="aboutUsPic"/>
        </article>
      </div>
    )
  }
};

export default About;
