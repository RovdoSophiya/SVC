import React, { Component } from "react";
import {
  Avatar,
  Container,
  Divider,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <Divider />
        <Container className="footer-info">
          <div className="links-and-email">
            <div className="link-block">
              <div className="first-links-block">
                <Tooltip title="Learn about sustainability" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto', color:'#b45f4d'}}>
                  Sustainability
                  </Avatar>
                </Tooltip>
                <Tooltip title="Get in touch" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  Contact us
                  </Avatar>
                </Tooltip>
                <Tooltip title="Frequently Asked Questions" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  FAQ
                  </Avatar>
                </Tooltip>
                <Tooltip title="Careers opportunities" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  Careers
                  </Avatar>
                </Tooltip>
              </div>
              <div className="second-links-block">
                <Tooltip title="Read our Privacy Policy" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  Privacy Policy
                  </Avatar>
                </Tooltip>
                <Tooltip title="California Privacy Rights" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  CA Privacy Rights
                  </Avatar>
                </Tooltip>
                <Tooltip title="Terms of Use" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  Terms of Use
                  </Avatar>
                </Tooltip>
                <Tooltip title="Sign up for our newsletter" arrow>
                  <Avatar variant="rounded" className="link" sx={{ backgroundColor: 'transparent', width: 'auto',color:'#b45f4d'}}>
                  Newsletter
                  </Avatar>
                </Tooltip>
              </div>
            </div>

            <div className="email-block">
              <p data-i18="firstEmailText" className="first-email-text">
                ONLY GOOD HAIR DAES AHEAD—AND 10% OFF YOUR FIRST ORDER
              </p>
              <div className="email">
                <TextField
                  type="email"
                  className="email-input"
                  placeholder="Enter your email"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  data-i18="subscribe"
                  className="subscribe open-popup"
                  variant="contained"
                  sx={{
                    marginLeft: 2,
                    backgroundColor: '#b45f4d',
                    "&:hover": { backgroundColor: "#b45f4c" },
                  }}
                >
                  Subscribe
                </Button>
              </div>
              <p data-i18="underEmailText" className="under-email-text">
                Want to shop in person? Swing by our showroom.
              </p>
              <p data-i18="address" className="under-email-text">
                M-F, 10am-2pm 5051 E Indigo St, Suite 105, Mesa, AZ 85205
              </p>
            </div>
          </div>
        </Container>
        <div className="rights">
          <p data-i18="rights">© 2021 dae. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
