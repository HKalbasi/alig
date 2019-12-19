import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import FS from '../components/fs';

const Home = (props) => (
  <Container className="p-3">
    <Head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        crossorigin="anonymous"
      />
    </Head>
    <div>
      <h1>
        project-name
      </h1>
      branch: master
    </div>
    <div>
      <Tabs id="controlled-tab-example">
        <Tab eventKey="code" title="Code">
          <FS tree="c534a93d25a7f897a37f80eb9737f71cbb51e1ac" xxx={console.log(props.url.query)}/>
        </Tab>
        <Tab eventKey="issues" title="Issues / Merge requests">
          y
        </Tab>
        <Tab eventKey="contact" title="Actions">
          z
        </Tab>
        <Tab eventKey="security" title="Security">
          z
        </Tab>
        <Tab eventKey="insight" title="Insight">
          z
        </Tab>
      </Tabs>
    </div>
  </Container>
)

export default Home
