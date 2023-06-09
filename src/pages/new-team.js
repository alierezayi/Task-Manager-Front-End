import Notify from "@/components/Notify";
import Layout from "@/components/layout";
import projectAPI from "@/services/projectAPI";
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import teamIcon from "../../public/images/user-add-svgrepo-com (1).svg";

const NewTeam = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [response, setResponse] = useState({});

  const { token } = useSelector((state) => state.login);
  console.log(token);

  const inputTagHandler = (e) => {
    setTagInput(e.target.value);
  };

  const fileInputHandler = (e) => {
    setImage(e.target.files[0]);
  };

  console.log(response);

  useEffect(() => {
    if (response.success) {
      router.push("/projects");
    }
  }, [response]);

  const appendNewTag = () => {
    if (tagInput.trim()) {
      setTags((prevState) => [...prevState, tagInput]);
    }
    setTagInput("");
  };

  const newProjectHandler = (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Text", data.Text);
    formData.append("image", image);
    tags.forEach((value) => {
      formData.append("tags[]", value);
    });

    if (image) {
      projectAPI
        .createProject(token, formData)
        .then((res) => {
          setResponse(res.data);
        })
        .catch((error) => {
          setResponse(error.response.data);
        });
    }
  };

  return (
    <>
      <Head>
        <title>تیم جدید</title>
      </Head>
      <Layout>
        <div className="w-full h-full">
          <div className="w-full max-w-xl my-10 md:rounded-xl bg-white shadow-sm mx-auto px-4 md:px-10 py-16">
            <div className="flex flex-col justify-center items-center">
              <div className="w-14 h-14 bg-green-500 rounded-full flex flex-col justify-center items-center mb-2">
                <Image
                  src={teamIcon}
                  width="auto"
                  height="auto"
                  alt=""
                  className="w-8 h-8"
                />{" "}
              </div>
              <h1 className="font-semibold text-lg mt-0">ساخت تیم جدید</h1>
            </div>

            <form className="mt-10" onSubmit={handleSubmit(newProjectHandler)}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className=" text-gray-600">
                    نام{" "}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className={`block p-3 border w-full bg-white text-sm mt-1 text-gray-900 bg-transparent rounded-2xl border-1 border-gray-200  focus:outline-none peer focus:ring-0 ${
                      errors.name
                        ? "focus:border-rose-600"
                        : "focus:border-blue-600"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-500">
                      لطفا نام تیم را وارد کنید
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="text-sm text-gray-600"
                  >
                    توضیحات{" "}
                  </label>
                  <textarea
                    id="description"
                    {...register("Description", {
                      required: true,
                      maxLength: 50,
                    })}
                    className={`border rounded-2xl w-full p-3 mt-1 text-sm outline-none focus:border-blue-600 ${
                      errors.Description
                        ? "focus:border-rose-600"
                        : "focus:border-blue-600"
                    }`}
                    placeholder=""
                  />
                  {errors.Description && (
                    <span className="text-xs text-rose-500 mt-1">
                      این کادر نمی تواند خالی باشد
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-600" htmlFor="tags">
                    افزودن عضو{" "}
                  </label>
                  <div className="inline-flex items-center">
                    <input
                      id="tags"
                      type="text"
                      value={tagInput}
                      onChange={inputTagHandler}
                      className="border-b outline-none p-1 focus:border-blue-600 w-full"
                    />
                    <button
                      type="button"
                      onClick={appendNewTag}
                      className="p-1 rounded-md bg-slate-100 hover:bg-slate-200  text-slate-700 mr-2"
                    >
                      <PlusIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <ul className="flex flex-wrap space-x-reverse space-x-2 mt-3">
                    {tags.length
                      ? tags.map((tag, index) => (
                          <li
                            key={index}
                            className="inline-flex py-1 mt-1 items-center px-3 rounded-full text-blue-600 bg-blue-50"
                          >
                            <TagIcon className="w4 h-4 ml-1" />
                            <span className="text-xs">{tag}</span>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                <div>
                  <label htmlFor="name" className=" text-gray-600">
ID تیم                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className={`block p-3 border w-full bg-white text-sm mt-1 text-gray-900 bg-transparent rounded-2xl border-1 border-gray-200  focus:outline-none peer focus:ring-0 ${
                      errors.name
                        ? "focus:border-rose-600"
                        : "focus:border-blue-600"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-500">
                      لطفا نام تیم را وارد کنید
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 flex justify-center text-white active:transform active:scale-95 transition"
                >
                  ایجاد تیم{" "}
                </button>
              </div>
              {/* {Object.keys(response).length > 0 && (
                <Notify
                  options={{
                    type: response.success ? "success" : "error",
                    description: response.message,
                  }}
                />
              )} */}
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewTeam;
