import { useState } from "react";

import Wrapper from "@/components/Wrapper";
import useFetchKnowledgeBase from "@/hooks/useFetchKnowledgeBase";
import SelectModelVersionButton from "@/components/SelectModelVersionButton";

const Model = () => {
  const [value, setValue] = useState("");

  const { data: kbs, isLoading } = useFetchKnowledgeBase();

  return (
    <Wrapper title="Model" norMargin>
      <SelectModelVersionButton
        kbs={kbs}
        isLoading={isLoading}
        value={value}
        setValue={setValue}
      />
    </Wrapper>
  );
};

export default Model;
