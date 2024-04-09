import AccountTable from "@/components/account-table/AccountTable";
import CreateAccountButton from "@/components/account-table/CreateAccountButton";
import Wrapper from "@/components/Wrapper";

const Account = () => {
  return (
    <Wrapper title="Account" norMargin className="space-y-4">
      <CreateAccountButton />
      <AccountTable />
    </Wrapper>
  );
};

export default Account;
