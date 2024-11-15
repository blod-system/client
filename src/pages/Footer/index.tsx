import { GithubOutlined, MailOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <div className="max-h-14 min-h-14 bg-blue-950 px-10 flex justify-evenly items-center text-white">
      {/* footer */}
      <a href="https://github.com/orgs/blod-system/repositories" target="_blank" className="flex items-center hover:font-bold">
        <GithubOutlined className="text-3xl mr-2" />
        <span className="mt-1">GitHub</span>
      </a>
      <p className="flex items-center">
        <MailOutlined className="text-3xl mr-2" />
        <span >catmoon1017@gmail.com</span>
      </p>
    </div>
  )
}