import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../components/molecules/BreadcrumbNav";
import AccountSidebarNav from "../components/organisms/AccountSidebarNav";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../lib/orders";
import { formatPrice } from "../lib/format";

export default function AccountOrders() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const orders = getOrders().filter((o) => o.userId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <BreadcrumbNav
          items={[
            { label: t("nav.home"), to: "/" },
            { label: t("footer.myAccount"), to: "/account" },
            { label: t("account.ordersTitle") },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <AccountSidebarNav active="orders" />
        <div className="border border-line rounded-sm p-8 max-w-3xl">
          <h1 className="text-primary font-medium mb-6">{t("account.ordersTitle")}</h1>
          {orders.length === 0 ? (
            <p className="text-sm text-body">{t("account.noOrders")}</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {orders.map((o) => (
                <li key={o.id} className="border-b border-line pb-6 last:border-b-0">
                  <div className="flex justify-between gap-4 text-sm font-medium">
                    <span>{o.id}</span>
                    <span>{formatPrice(o.total)}</span>
                  </div>
                  <p className="text-xs text-body mt-1">
                    {new Date(o.createdAt).toLocaleDateString(i18n.language)} ·{" "}
                    {t("account.orderItems", { n: o.items.reduce((n, i) => n + i.qty, 0) })}
                  </p>
                  <ul className="mt-2 text-sm text-body">
                    {o.items.map((i) => (
                      <li key={`${o.id}-${i.productId}`}>
                        {i.title} × {i.qty}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
