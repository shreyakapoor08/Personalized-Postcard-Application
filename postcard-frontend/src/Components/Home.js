import React from 'react';
import './Home.css'; 
import shareImg from '../Images/share-image.png';
import audiototext from '../Images/audiototext.jpeg';
import memorypostcard from '../Images/memorypostcard.webp';

const Home = () => {
  return (
    <>
    <section id="team">
      <div className="container">
        <h2 className="section-title">Why choose <span>US</span></h2>
        <div className="members-container">
          <div className="member">
            <div className="member-img">
              <img src={shareImg} alt="" />
            </div>
            <div className="member-name">
              <p>Easily dispatch within minutes</p>
            </div>
            
          </div>
          <div className="member">
            <div className="member-img">
              <img src={audiototext} alt="" />
            </div>
            <div className="member-name">
              <p>Personalised audio for them</p>
            </div>
            
          </div>
          <div className="member">
            <div className="member-img">
              <img src={memorypostcard} alt="" />
            </div>
            <div className="member-name">
              <p>Provides a lifetime memory</p>
            </div>
           
          </div>
          
        </div>
      </div>
    </section>
    <section id="services">
    <h2 className="section-title">What our customers <span>SAY</span></h2>
        <div className="services-container">
          <div className="service one">
            <h3>John Doe</h3>
            <p>The postcard app has revolutionized how I stay connected with my loved ones. With just a few clicks, I can send heartfelt messages accompanied by personalized photos, creating lasting memories. It's convenient, easy to use, and always puts a smile on the faces of those I care about.</p>
            
          </div>
          <div className="service two">
            <h3>Emily Smith</h3>
            <p>I've been using the postcard app for months now, and I can't recommend it enough! Whether it's a birthday, anniversary, or just to say hello, the app provides a seamless way to send thoughtful greetings.</p>
            
          </div>
          <div className="service three">
            <h3>David Johnson</h3>
            <p>The postcard app has become my go-to for sending thoughtful messages to friends and family, near and far. Its user-friendly interface makes it easy to create beautiful postcards in minutes.</p>
            
          </div>
          <div className="service four">
            <h3>Michael Brown</h3>
            <p>I was blown away by the audio feature of the postcard app! Being able to record a personal message in my own voice added a whole new dimension to my greetings. Whether it's singing happy birthday or sharing heartfelt words, the ability to send audio postcards makes every message feel more intimate and genuine. It's like sending a piece of myself along with the card, and my friends and family absolutely love it!.</p>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
