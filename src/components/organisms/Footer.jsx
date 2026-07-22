import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import NewsletterForm from "../molecules/NewsletterForm";

export default function Footer() {
  const { t } = useTranslation();

  const COLUMNS = [
    {
      title: t("footer.support"),
      items: [
        "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
        "exclusive@gmail.com",
        "+88015-88888-9999",
      ],
      isText: true,
    },
    {
      title: t("footer.account"),
      items: [
        { label: t("footer.myAccount"), to: "/account" },
        { label: t("footer.loginRegister"), to: "/login" },
        { label: t("footer.cart"), to: "/cart" },
        { label: t("footer.wishlist"), to: "/wishlist" },
        { label: t("footer.shop"), to: "/" },
      ],
    },
    {
      title: t("footer.quickLink"),
      items: [
        { label: t("footer.privacyPolicy"), to: "#" },
        { label: t("footer.termsOfUse"), to: "#" },
        { label: t("footer.faq"), to: "#" },
        { label: t("footer.contact"), to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div>
          <h3 className="font-heading text-lg font-bold mb-4">Exclusive</h3>
          <p className="text-sm mb-3">{t("footer.subscribe")}</p>
          <p className="text-xs text-white/70 mb-3">
            {t("footer.subscribeDesc")}
          </p>
          <NewsletterForm />
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.isText
                ? col.items.map((t) => (
                    <li key={t} className="text-xs text-white/70">
                      {t}
                    </li>
                  ))
                : col.items.map((i) => (
                    <li key={i.label}>
                      <Link
                        to={i.to}
                        className="text-xs text-white/70 hover:text-white"
                      >
                        {i.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold mb-4">
            {t("footer.downloadApp")}
          </h4>
          <p className="text-[10px] text-white/60 mb-2">
            {t("footer.downloadAppDesc")}
          </p>
          <div className="flex gap-2">
            <img src="/QrCode.png" alt="qr code image" />
            <div className="flex flex-col justify-between">
              <img src="/googlePlay.png" alt="google play" />
              <img src="/appStore.png" alt="app store" />
            </div>
          </div>
          <div className="flex items-center gap-6 ml-1.75 mt-6">
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7H10.5L10 9H6V18H4V9H0V7H4V5.128C4 3.345 4.186 2.698 4.534 2.046C4.87501 1.40181 5.40181 0.875009 6.046 0.534C6.698 0.186 7.345 0 9.128 0C9.65 0 10.108 0.0500001 10.5 0.15V2H9.128C7.804 2 7.401 2.078 6.99 2.298C6.686 2.46 6.46 2.686 6.298 2.99C6.078 3.401 6 3.804 6 5.128V7Z"
                fill="white"
              />
            </svg>

            <svg
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1211 0.443359C12.9979 0.0925405 13.9592 0.00852311 14.8838 0.201172C15.8082 0.393885 16.6557 0.854624 17.3193 1.52637L17.3486 1.55664H17.3906C17.7296 1.55426 18.0806 1.59738 18.498 1.53809C18.882 1.48352 19.3278 1.34203 19.915 1.00977C19.6091 2.49447 19.4324 3.16729 18.7646 4.08301L18.7451 4.10938V4.14258C18.7451 7.9414 17.5781 10.7564 15.8262 12.7393C14.0729 14.7234 11.7275 15.8816 9.3623 16.3535C7.7452 16.6761 5.754 16.5731 3.99609 16.2109C3.11794 16.03 2.30096 15.7842 1.62012 15.4971C1.03699 15.2511 0.560061 14.9759 0.229492 14.6885C0.6606 14.6463 1.41195 14.553 2.24414 14.3594C3.24389 14.1267 4.37194 13.749 5.20312 13.1406L5.31934 13.0557L5.19922 12.9766C4.50766 12.5207 2.81165 11.4984 1.73145 9.5166C0.667008 7.56375 0.19288 4.66296 1.91406 0.425781C3.57929 2.34325 5.27273 3.66041 6.99512 4.36719C7.57627 4.60556 7.94226 4.72333 8.23145 4.79102C8.51953 4.85841 8.73223 4.8754 8.99219 4.91113L9.28711 4.95215L9.10742 4.77148C9.13232 3.84188 9.4255 2.93867 9.9541 2.17285C10.4906 1.3958 11.2444 0.794138 12.1211 0.443359ZM13.9053 1.90137C13.119 1.90124 12.3638 2.20994 11.8027 2.76074C11.3119 3.24267 11.0038 3.87627 10.9248 4.55371L10.9053 4.84668L10.877 6.4209C10.8756 6.49137 10.8592 6.56125 10.8291 6.625C10.799 6.6887 10.7556 6.74517 10.7021 6.79102C10.6487 6.83684 10.5861 6.87164 10.5186 6.8916C10.4511 6.91147 10.3802 6.91658 10.3105 6.90723L8.74902 6.69531C6.71753 6.41828 4.7663 5.48248 2.88965 3.91895L2.75781 3.80859L2.72754 3.97754C2.42573 5.64812 2.56793 7.0709 3.14746 8.30176C3.72674 9.53198 4.73875 10.5607 6.15625 11.4521L7.90234 12.5498C7.97145 12.5932 8.02959 12.6529 8.07031 12.7236C8.11103 12.7944 8.1339 12.8744 8.13672 12.9561C8.13951 13.0377 8.12173 13.1189 8.08594 13.1924C8.05014 13.2658 7.99667 13.3299 7.93066 13.3779L6.33887 14.541L6.11523 14.7041L6.3916 14.7207C7.34472 14.7801 8.25319 14.738 9.00977 14.5879C11.3887 14.1129 13.375 12.9789 14.7656 11.2207C16.1559 9.46269 16.9453 7.08826 16.9453 4.14258C16.9453 3.99705 16.8715 3.78499 16.7441 3.55762C16.6144 3.32598 16.4211 3.06491 16.167 2.82031C15.6584 2.33085 14.8999 1.90145 13.9053 1.90137Z"
                fill="white"
                stroke="black"
                stroke-width="0.2"
              />
            </svg>

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.75 0.75H4.75C3.68913 0.75 2.67172 1.17143 1.92157 1.92157C1.17143 2.67172 0.75 3.68913 0.75 4.75V14.75C0.75 15.8109 1.17143 16.8283 1.92157 17.5784C2.67172 18.3286 3.68913 18.75 4.75 18.75H14.75C15.8109 18.75 16.8283 18.3286 17.5784 17.5784C18.3286 16.8283 18.75 15.8109 18.75 14.75V4.75C18.75 3.68913 18.3286 2.67172 17.5784 1.92157C16.8283 1.17143 15.8109 0.75 14.75 0.75Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M9.75 13.75C10.8109 13.75 11.8283 13.3286 12.5784 12.5784C13.3286 11.8283 13.75 10.8109 13.75 9.75C13.75 8.68913 13.3286 7.67172 12.5784 6.92157C11.8283 6.17143 10.8109 5.75 9.75 5.75C8.68913 5.75 7.67172 6.17143 6.92157 6.92157C6.17143 7.67172 5.75 8.68913 5.75 9.75C5.75 10.8109 6.17143 11.8283 6.92157 12.5784C7.67172 13.3286 8.68913 13.75 9.75 13.75V13.75Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M15.25 5.25C15.5152 5.25 15.7696 5.14464 15.9571 4.95711C16.1446 4.76957 16.25 4.51522 16.25 4.25C16.25 3.98478 16.1446 3.73043 15.9571 3.54289C15.7696 3.35536 15.5152 3.25 15.25 3.25C14.9848 3.25 14.7304 3.35536 14.5429 3.54289C14.3554 3.73043 14.25 3.98478 14.25 4.25C14.25 4.51522 14.3554 4.76957 14.5429 4.95711C14.7304 5.14464 14.9848 5.25 15.25 5.25Z"
                fill="white"
              />
            </svg>

            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 6.05C9.417 5.113 10.611 4.5 12 4.5C13.4587 4.5 14.8576 5.07946 15.8891 6.11091C16.9205 7.14236 17.5 8.54131 17.5 10V17.5H15.5V10C15.5 9.07174 15.1313 8.1815 14.4749 7.52513C13.8185 6.86875 12.9283 6.5 12 6.5C11.0717 6.5 10.1815 6.86875 9.52513 7.52513C8.86875 8.1815 8.5 9.07174 8.5 10V17.5H6.5V5H8.5V6.05ZM1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0C1.89782 0 2.27936 0.158035 2.56066 0.43934C2.84196 0.720644 3 1.10218 3 1.5C3 1.89782 2.84196 2.27936 2.56066 2.56066C2.27936 2.84196 1.89782 3 1.5 3ZM0.5 5H2.5V17.5H0.5V5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        {t("footer.copyright")}
      </div>
    </footer>
  );
}
