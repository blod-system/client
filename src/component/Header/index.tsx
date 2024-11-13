import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useUserStore } from "../../store/userStore";

// import { useNavigate } from 'react-router-dom';
export default function Header() {
	const user = useUserStore();

	return (
		<div className="max-h-14 min-h-11 bg-blue-950 px-10 flex justify-end items-center text-white text-lg">
			{user.userInfo ?
				<>
					<button className="mr-3 pr-3 border-r-2">
						<UserOutlined className="text-2xl" />
					</button>
					<button >
						<LogoutOutlined className="mr-1 text-xl" /> Log Out
					</button>
				</>
				: <button><LoginOutlined className="mr-1 text-xl" /> Login</button>
			}
		</div>
	);
}
