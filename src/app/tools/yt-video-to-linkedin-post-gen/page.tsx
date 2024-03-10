import React from "react";
import YoutubeToLinkedinContainer from "~/components/containers/YoutubeToLinkedin.container";

type Props = {};

const LinkedinPostGenerator = (props: Props) => {
  return (
    <section className="flex flex-col justify-between md:flex-row">
      <YoutubeToLinkedinContainer />
    </section>
  );
};

export default LinkedinPostGenerator;
