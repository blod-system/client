import { useState } from "react";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { message } from 'antd'
import { useUserStore } from "../../store/userStore";
import { UserInfoModal } from "./component/UserInfoModal";
import { LoginParam, SignUpParam, UpdateUserInfoData, UpdateUserInfoParams } from "./types";
import { login, singUp, logout, updateUserInfo } from '../../api/userApi'
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

	async function handelLogin(value: LoginParam) {
		const loginRes = await login(value)
		if (loginRes?.status === 200) {
			await user.getUserInfo()
			messageBox.open({
				type: 'success',
				content: loginRes.message,
			});
			setShowLoginModal(false)
		} else {
			messageBox.open({
				type: 'error',
				content: loginRes.message,
			});
		}
	}

	async function handelSignUp(value: SignUpParam) {
		const signUpRes = await singUp({ ...value, birthday: new Date(value.birthday) })

		if (signUpRes.status === 200) {
			messageBox.open({
				type: 'success',
				content: signUpRes.message
			})
			setShowSignUpModal(false)
		} else {
			messageBox.open({
				type: 'error',
				content: signUpRes.message,
			});
		}
	}

	async function handelLogout() {
		const logoutRes = await logout()
		if (logoutRes.status === 200) {
			messageBox.open({
				type: 'success',
				content: logoutRes.message,
			})
			user.clearUserInfo()
			setShowLogoutModal(false)
		} else {
			messageBox.open({
				type: 'error',
				content: logoutRes?.message
			});
		}
	}

	async function handelUpdateUserInfo(value: UpdateUserInfoData, callBack: () => void) {
		const params: UpdateUserInfoParams = {
			name: value.name,
			birthday: new Date(value.birthday),
			email: value.email,
			phone: value.phone,
			gender: value.gender,
			is_reminder_active: value.isReminderActive,
		}

		const updateRes = await updateUserInfo(params)
		if (updateRes?.status === 200) {
			messageBox.open({
				type: 'success',
				content: updateRes.message,
			});
			callBack()
		} else {
			messageBox.open({
				type: 'error',
				content: updateRes.message,
			});
		}
	}

	return (
		<div className="max-h-14 min-h-11 bg-blue-950 px-10 flex justify-end items-center text-white text-lg">
			{context}
			<LoginModal
				isShow={showLoginModal}
				onCancel={() => setShowLoginModal(false)}
				onConfirm={handelLogin}
				onOpenSignUp={toggleLoginModalToSignUpModal}
			/>
			<SignUpModal
				isShow={showSignUpModal}
				onCancel={() => setShowSignUpModal(false)}
				onConfirm={handelSignUp} />
			<LogoutModal
				isShow={showLogout}
				onCancel={() => setShowLogoutModal(false)}
				onConfirm={handelLogout}
			/>
			<UserInfoModal
				isShow={showUserInfoModal}
				onCancel={() => setShowUserInfoModal(false)}
				onConfirm={(handelUpdateUserInfo)}
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
