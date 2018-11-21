import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button,
  Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm} from 'react-redux-form';
import {ValidatedInput} from './templates/FormComponent';
import {REQUIRED, MINLENGTH, MAXLENGTH, ISNUMBER, VALIDEMAIL} from '../shared/rules';

class Contact extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {

    return (
      <div className="container">
            <div className="row ">

              <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Contact</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row row-content">
              <div className="col-12">
                <h3>Location Information</h3>
              </div>
              <div className="col-12 col-sm-4 offset-sm-1">
                      <h5>Our Address</h5>
                      <address>
                      121, Clear Water Bay Road<br />
                      Clear Water Bay, Kowloon<br />
                      HONG KONG<br />
                      <i className="fa fa-phone"></i>: +852 1234 5678<br />
                      <i className="fa fa-fax"></i>: +852 8765 4321<br />
                      <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                      </address>
              </div>
              <div className="col-12 col-sm-6 offset-sm-1">
                  <h5>Map of our Location</h5>
              </div>
              <div className="col-12 col-sm-11 offset-sm-1">
                  <div className="btn-group" role="group">
                      <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                      <a role="button" className="btn btn-info" href="skype:ristoranteconfusion"><i className="fa fa-skype"></i> Skype</a>
                      <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                  </div>
              </div>
            </div>
            <div className="row row-content">
              <div className="col-12">
                <h3>Send us your feedback</h3>
              </div>
              <div className="col-12 col-md-9">
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <ValidatedInput field="firstname" name="First Name" type="text"
                      vrules={{REQUIRED, maxLength: MAXLENGTH(15), minLength: MINLENGTH(3)}} />
                  <ValidatedInput field="lastname" name="Last Name" type="text"
                      vrules={{REQUIRED, maxLength: MAXLENGTH(15), minLength: MINLENGTH(3)}} />
                  <ValidatedInput field="telnum" name="Tel. Number" type="tel" vrules={{REQUIRED, ISNUMBER}} />
                  <ValidatedInput field="email" name="Email" type="email" vrules={{REQUIRED, VALIDEMAIL}} />

                  <Row className="form-group">
                    <Col md={{size: 6, offset: 2}}>
                      <div className="form-check">
                        <Label check>
                          <Control.checkbox type="checkbox" id="agree" name="agree"
                              placeholder="Email" model=".agree"
                              className="form-check-input"/>
                            {' '}<strong>May we contact you?</strong>
                        </Label>
                      </div>
                    </Col>
                    <Col md={{size: 3, offset: 1}}>
                      <Control.select type="select" id="contactType" name="contactType"
                          placeholder="Email" model=".contactType"
                          className="form-control">
                        <option>Tel.</option>
                        <option>Email</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="message" md={2}>Your Feedback</Label>
                    <Col md={10}>
                      <Control.textarea type="textarea" id="message" name="message"
                          rows="12" model=".message"
                          className="form-control"/>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Col md={{size:10, offset:2}}>
                      <Button type="submit" color="primary">
                        Send Feedback
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </div>
            </div>
        </div>
    );
  }

  handleSubmit(values) {
    console.log("values:", values);
    alert("Thanks for of submit!!");
    //event.preventDefault();
  }

};

export default Contact;
