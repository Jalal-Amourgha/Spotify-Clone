import { verifiedIcon } from "../assets/icons";

interface BackgroundInfoProps {
  type?: string;
  title?: string;
  description?: string;
  img?: string;
  verified?: boolean;
  rounded?: boolean;
}

const BackgroundInfo = ({
  type,
  title,
  description,
  img,
  verified,
  rounded,
}: BackgroundInfoProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center relative z-10 gap-5 w-full mx-1 md:mx-5 mt-10 md:mt-100 mb-10">
      <div>
        {img && (
          <img
            src={img}
            height={200}
            width={200}
            className={`${
              rounded ? "rounded-full" : "rounded-lg"
            } mx-auto md:mx-0`}
            sizes="100%"
            alt="verified icon"
          />
        )}
      </div>
      <div className="text-left text-white">
        {verified ? (
          <div className="flex items-center gap-2">
            <img
              src={verifiedIcon}
              height={30}
              width={30}
              sizes="100%"
              alt="verified icon"
            />
            <p>Verified Artist</p>
          </div>
        ) : (
          <p className="hidden md:block">{type}</p>
        )}

        <h1 className="text-3xl md:text-8xl font-bold my-4">{title}</h1>
        <p className="text-gray">{description}</p>
      </div>
    </div>
  );
};

export default BackgroundInfo;
