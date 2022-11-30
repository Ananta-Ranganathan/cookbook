import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { useContext } from "react";
import { LoginContext, useLoginContext } from "../LoginContext";
import React from 'react'

function Landing() {
  let login = useLoginContext();

  if (login.username === "") {
    return (
      <div>
        <Popular />
        <Veggie />
      </div>
    )
  }
  else {
    return (
      <div>
        <Popular />
      </div>
    )
  }
}

export default Landing;