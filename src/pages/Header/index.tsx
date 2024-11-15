import { useState } from "react";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { message } from 'antd'
import { useUserStore } from "../../store/userStore";
import { UserInfoModal } from "./component/UserInfoModal";
import { LoginParam, SignUpParam, UpdateUserInfoParam } from "./types";
import LoginModal from "./component/LoginModal";
import SignUpModal from "./component/SignUpModal";
import LogoutModal from "./component/LogoutModal";

export default function Header() {
	const user = useUserStore();
	const [messageBox, context] = message.useMessage();
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
	const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
	const [showLogout, setShowLogoutModal] = useState<boolean>(false)
	const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false)

	function toggleLoginModalToSignUpModal() {
		setShowLoginModal(false)
		setShowSignUpModal(true)
	}

	function login(value: LoginParam) {
		console.log(value)
		setShowLoginModal(false)
	}

	function signUp(value: SignUpParam) {
		console.log(value)
		setShowSignUpModal(false)
	}

	function logout() {
		setShowLogoutModal(false)
	}

	function updateUserInfo(value: UpdateUserInfoParam) {
		console.log(value.birthday)
		setShowUserInfoModal(false)
		messageBox.open({
			type: 'success',
			content: 'This is a success message',
		});
	}

	return (
		<div className="max-h-14 min-h-11 bg-blue-950 px-10 flex justify-end items-center text-white text-lg">
			{context}
			<LoginModal
				isShow={showLoginModal}
				onCancel={() => setShowLoginModal(false)}
				onConfirm={login}
				onOpenSignUp={toggleLoginModalToSignUpModal}
			/>
			<SignUpModal
				isShow={showSignUpModal}
				onCancel={() => setShowSignUpModal(false)}
				onConfirm={signUp} />
			<LogoutModal
				isShow={showLogout}
				onCancel={() => setShowLogoutModal(false)}
				onConfirm={logout}
			/>
			<UserInfoModal
				isShow={showUserInfoModal}
				onCancel={() => setShowUserInfoModal(false)}
				onConfirm={(updateUserInfo)}
			/>
			{user.userInfo ?
				<>
					<button className="mr-3 pr-3 border-r-2" onClick={() => setShowUserInfoModal(true)}>
						<UserOutlined className="text-2xl" />
					</button>
					<button onClick={() => setShowLogoutModal(true)}>
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
