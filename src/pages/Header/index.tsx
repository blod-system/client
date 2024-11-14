import { useState } from "react";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useUserStore } from "../../store/userStore";
import LoginModal from "./component/LoginModal";
import { LoginParam } from "./types";

export default function Header() {
	const user = useUserStore();
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

	function login(value: LoginParam) {
		console.log(value)
		setShowLoginModal(false)
	}

	return (
		<div className="max-h-14 min-h-11 bg-blue-950 px-10 flex justify-end items-center text-white text-lg">
			<LoginModal
				isShow={showLoginModal}
				onCancel={() => setShowLoginModal(false)}
				onConfirm={login} />
			{user.userInfo ?
				<>
					<button className="mr-3 pr-3 border-r-2">
						<UserOutlined className="text-2xl" />
					</button>
					<button >
						<LogoutOutlined className="mr-1 text-xl" /> Log Out
					</button>
				</>
				:
				<button onClick={() => setShowLoginModal(true)}>
					<LoginOutlined className="mr-1 text-xl" /> Login
				</button>
			}
		</div>
	);
}
