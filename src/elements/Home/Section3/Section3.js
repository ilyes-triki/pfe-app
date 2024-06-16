import React from 'react';
import './Section3.css'; 


const Section3 = () => {
  return (
    <div className="">
    <h1 className="title">Featured Solutions</h1>
    <section className="articles">
    
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/736x/d7/3a/91/d73a915476de0d414a5a0b52546a918b.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Waste and wastewater facilities</h2>
            <p>
              Lighting in water treatment applications must provide adequate illumination that enhances worker safety, improves productivity, and reduces maintenance costs. In spaces with demanding environments
            </p>
            <a href="#" className="read-more">
              Get started <span className="sr-only">about this is some title</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </article>
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/564x/b4/ff/fb/b4fffbe3152c8b932434fd169209c35d.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Public infrastructure and IIJA</h2>
            <p>
             Your IIJA-funded project is not complete without lighting.
For your infrastructure projects, use lighting to prioritize resiliency and energy efficiency while improving visibility, enhancing safety, and reducing carbon emissions and maintenance costs
            </p>
            <a href="#" className="read-more">
              Get started <span className="sr-only">about this is some title</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </article>
      <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/564x/42/cd/63/42cd63859409660266031858d61e8578.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Street and Roadway</h2>
            <p>
              Street and roadway applications require precise light distribution,  optical quality to enhance driver and pedestrian safety, and robust designs to withstand prolonged exposure to harsh environments.
            </p>

          </div>
        </div>
      </article>
            <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/564x/30/a9/59/30a9594388848992799954af39574a63.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Manufacturing Facilities</h2>
            <p>
             Did you know that falls, slips, and trips are the second most common reason for fatal occupational injuries? From semiconductor and electric vehicle (EV) battery production to assembly lines and metal fabrication, safety and efficiency are paramount for manufacturing operations.
            </p>
          </div>
        </div>
      </article>
            <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/564x/7d/82/88/7d8288bc6fd23a1b3e5ab7970acbc285.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>WareHouse</h2>
            <p>
             
From storage racks to loading docks, lighting in warehouse applications must provide energy-efficient vertical illumination with superior performance and reliability to support the daily operation of a safe working environment.
            </p>
          </div>
        </div>
      </article>
            <article>
        <div className="article-wrapper">
          <figure>
            <img src="https://i.pinimg.com/564x/5e/5d/66/5e5d662c921863194a418694b9476c18.jpg" alt="" />
          </figure>
          <div className="article-body">
            <h2>Municipalities and local government</h2>
            <p>
             From roadways and government facilities, to parks and public spaces, municipalities and local governments require lighting that provides adequate illumination without glare, shadows, or frequent maintenance needs.
            </p>

          </div>
        </div>
      </article>
    </section>
    </div>
  );
};

export default Section3;

