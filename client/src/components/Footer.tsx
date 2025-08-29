import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin, mdiEmail } from "@mdi/js";

function Footer() {
  return (
    <div className="fixed bottom-0 flex p-2 justify-between w-screen">
      <div className="about">
        {" "}
        <p>François Thullier 2025</p>
      </div>
      <div className="socials flex">
        <Icon path={mdiGithub} size={1.5} className="cursor-pointer"></Icon>
        <Icon path={mdiLinkedin} size={1.5} className="cursor-pointer"></Icon>
        <Icon path={mdiEmail} size={1.5} className="cursor-pointer"></Icon>
      </div>
    </div>
  );
}

export default Footer;
