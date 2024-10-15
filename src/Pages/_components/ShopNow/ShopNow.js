import React, { Component } from "react";
import "./photo-section.css";
import { Container, Grid2, Link } from "@mui/material";

class ShopNow extends Component {
  render() {
    const { text } = this.props;

    return (
      <section className="photo-section">
        <Container className="shop-now-container">
          <Grid2 container justifyContent="center" alignItems="center">
            <Grid2 item>
              <Link
                data-i18="shopText"
                className="shop-text"
                href="#"
                underline="none"
              >
                {text}
              </Link>
            </Grid2>
          </Grid2>
        </Container>
      </section>
    );
  }
}

export default ShopNow;
