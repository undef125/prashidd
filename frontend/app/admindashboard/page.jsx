import React from 'react'
import './admindashboard.css'

const page = () => {
  return (
    <div>
      
    <div class=" dabba">
        <aside class="sidebar">
            <div class="brand">
                <h1>Dashyat</h1>
            </div>
            <nav class="menu">
                <ul>
                    <li class="active"><a href="#">Dashboard</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Tasks</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
            </nav>
            <button class="add-project">Add New Project</button>
        </aside>

        <main class="main-content">
            <header class="header">
                <h2>Dashboard</h2>
                <span class="date">Sunday, 05 August 2021</span>
            </header>

            <section class="profile">
                <div class="profile-details">
                    <h3>Hello, Zaenal Suep</h3>
                    <p>You have an unfinished job. Among them are 2 design tasks, 3 mockup tasks, and 2 layouts. Work for the week is very good, already in progress 70%.</p>
                </div>
                <div class="progress">
                    <span>70% You're Progress</span>
                </div>
            </section>

            <section class="activity">
                <h3>Activity</h3>
                {/* <!-- Placeholder for graph --> */}
                <div class="graph">
                    <img src="path_to_graph_image.png" alt="Activity Graph"/>
                </div>
            </section>

            <section class="projects">
                <h3>Project</h3>
                <div class="project-cards">
                    <div class="card">
                        <h4>Baseline Project</h4>
                        <p>Make something interesting and make your day more meaningful.</p>
                    </div>
                    <div class="card">
                        <h4>Paper Industry</h4>
                        <p>Paper industry to explain the industry that is explored and pursued.</p>
                    </div>
                    <div class="card">
                        <h4>Tool Production</h4>
                        <p>Tools to provide your convenience in every access.</p>
                    </div>
                </div>
            </section>

            <section class="team">
                <h3>Team</h3>
                <div class="team-members">
                    <div class="member">
                        <img src="path_to_team_member_image.png" alt="Dhea Mufni"/>
                        <p>Dhea Mufni<br/>Graphic Designer</p>
                    </div>
                    <div class="member">
                        <img src="path_to_team_member_image.png" alt="Antonion"/>
                        <p>Antonion<br/>Development</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
    </div>
  )
}

export default page
