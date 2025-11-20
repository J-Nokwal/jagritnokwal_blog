'use client';
import config from '../../../sanity.config'

import { NextStudio } from "next-sanity/studio";

export default  function StudioComponent(){
    return (<NextStudio config={config} />)
}