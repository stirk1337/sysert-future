import { LoginButton } from "@telegram-auth/react";
import { useAppDispatch } from "./hooks";
import { setModal, setUser } from "./store/action";
import { telegramAuth } from "./store/api-actions/get-actions";

function TelegramModal() {
    const dispatch = useAppDispatch()

    return (
        <div className="modal">
            <header>Авторизация</header>
            <div className="modal-container">
                <p>Сохрани свой прогресс авторизовавшись через Telegram</p>
                <p>Оставь свои идеи на видном месте</p>
            </div>
            <LoginButton
                botUsername={'SysertAITelegram_bot'}
                onAuthCallback={(data) => {
                    dispatch(setUser(data as UserData))
                    dispatch(telegramAuth({ userData: data as UserData }))
                    dispatch(setModal(false))
                    // call your backend here to validate the data and sign in the user
                }}
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={20} // 0 - 20
                showAvatar={true} // true | false
                lang="ru"
            />
        </div>
    )
}

export default TelegramModal