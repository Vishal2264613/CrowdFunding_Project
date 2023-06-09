import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from "../store";
import { payoutProject } from "../services/blockchain";

const ProjectDetails = ({ project }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const expired = new Date().getTime() > Number(project?.expiresAt + "000");

  return (
    <div className="pt-24 mb-5 px-6 flex justify-center">
      <div className="flex justify-center flex-col md:w-100">
        <div
          className="flex justify-start items-start
        sm:space-x-5 flex-wrap"
        >
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded-xl h-54 object-fill sm:w-2/5 w-80"
          />

          <div className="flex-1 sm:py-0 py-4 ">
            <div className="flex flex-col justify-start flex-wrap ">
              <h5 className="text-green-500 text-l font-medium mb-2">
                {"Funding"}
              </h5>
              <h5 className="font-sans text-gray-600 text-3xl font-bold mb-2">
                {project?.title}
              </h5>
              <p className="text-2xl font-light mb-3 mt-3">
                {project?.description}
              </p>
              <small className="text-gray-900 text-sm mb-3 mt-3">
                {expired
                  ? "Expired"
                  : daysRemaining(project.expiresAt) + " left"}
              </small>
            </div>

            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2">
                <Identicons
                  className="rounded-full shadow-md"
                  string={project?.owner}
                  size={15}
                />
                {project?.owner ? (
                  <small className="text-gray-700">
                    {truncate(project?.owner, 4, 4, 11)}
                  </small>
                ) : null}
                <small className="text-gray-500 font-bold">
                  {project?.backers} Backer{project?.backers == 1 ? "" : "s"}
                </small>
              </div>

              <div className="font-bold">
                {expired ? (
                  <small className="text-red-500">Expired</small>
                ) : project?.status == 0 ? (
                  <small className="text-gray-500">Open</small>
                ) : project?.status == 1 ? (
                  <small className="text-green-500">Accepted</small>
                ) : project?.status == 2 ? (
                  <small className="text-gray-500">Reverted</small>
                ) : project?.status == 3 ? (
                  <small className="text-red-500">Deleted</small>
                ) : (
                  <small className="text-orange-500">Paid</small>
                )}
              </div>
            </div>

            <div>
              <div className="w-full overflow-hidden bg-gray-300 mt-5">
                <div
                  className="bg-green-600 text-xs font-medium
              text-green-100 text-center p-0.5 leading-none
              rounded-l-full h-2 overflow-hidden max-w-full"
                  style={{
                    width: `${(project?.raised / project?.cost) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center font-bold mt-5">
                <small>{project?.raised} ETH Raised</small>
                <small className="flex justify-start items-center">
                  <FaEthereum />
                  <span>{project?.cost} ETH</span>
                </small>
              </div>

              <div className="flex justify-start items-center space-x-2 mt-8">
                {project?.status == 0 ? (
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-green-600
              text-white font-medium text-xs leading-tight uppercase
              rounded-full shadow-md hover:bg-green-700"
                    onClick={() => setGlobalState("backModal", "scale-100")}
                  >
                    Back Project
                  </button>
                ) : null}

                {connectedAccount == project?.owner ? (
                  project?.status != 3 ? (
                    project?.status == 1 ? (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-orange-600
                        text-white font-medium text-xs leading-tight uppercase
                        rounded-full shadow-md hover:bg-orange-700"
                        onClick={() => payoutProject(project?.id)}
                      >
                        Payout
                      </button>
                    ) : project?.status != 4 ? (
                      <>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-gray-600
                          text-white font-medium text-xs leading-tight uppercase
                          rounded-full shadow-md hover:bg-gray-700"
                          onClick={() =>
                            setGlobalState("updateModal", "scale-100")
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600
                          text-white font-medium text-xs leading-tight uppercase
                          rounded-full shadow-md hover:bg-red-700"
                          onClick={() =>
                            setGlobalState("deleteModal", "scale-100")
                          }
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-gray-600
                        text-white font-medium text-xs leading-tight uppercase
                        rounded-full shadow-md hover:bg-gray-700"
                      >
                        Project Closed
                      </button>
                    )
                  ) : null
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
