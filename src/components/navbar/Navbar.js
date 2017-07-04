import React from 'react';
import {Navbar,Nav,NavItem,Grid,Row,Col} from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import styles from './Navbar.css.js';
import { LinkContainer } from 'react-router-bootstrap';

bootstrapUtils.addStyle(Navbar, 'custom');
bootstrapUtils.addStyle(Nav, 'custom');

export default class Navigator extends React.Component{
    render(){
        return (
            <Grid>
                <Row>
                    <Col xs={1} md={2} lg={1}></Col>
                    <Col xs={10} md={8} lg={10}>
                        <Navbar style={styles.navbar} bsStyle="custom" inverse collapseOnSelect fluid>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <LinkContainer to=""><a style={styles.logo}>BattlecrafT</a></LinkContainer>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav pullRight>
                                    <LinkContainer to="/aa"><NavItem>Tournaments</NavItem></LinkContainer>
                                    <LinkContainer to="/bb"><NavItem>Games</NavItem></LinkContainer>
                                    <LinkContainer to="/cc"><NavItem>Rankings</NavItem></LinkContainer>
                                    <LinkContainer to="/zz"><NavItem>My account</NavItem></LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col xs={1} md={2} lg={1}></Col>
                </Row>
            </Grid>
        );
    }
};
