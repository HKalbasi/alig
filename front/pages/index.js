import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import FS from '../components/fs';

const Home = () => (
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
          <FS tree="f0663673d6ff13d90b30e2ab5daa8f39aa0f41ab"/>
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
