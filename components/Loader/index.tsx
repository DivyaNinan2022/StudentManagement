import Image from "next/image";
import LoaderImg from '../../assets/loading-load.gif'; // Adjust path based on your project
import "../../css/common.css"; // Import the CSS file

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <Image src={LoaderImg} alt="Loading..." width={100} height={100} />
      </div>
    </div>
  );
}
