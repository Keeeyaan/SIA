import { useState } from "react";

import Wrapper from "@/components/Wrapper";
import { Card, CardHeader } from "@/components/ui/card";

import useFetchIntents from "@/hooks/useFetchIntents";
import useFetchPTandRPByTag from "@/hooks/useFetchPTandRPByTag";
import TablePTRP from "@/components/TablePTRP";
import CreateIntentButton from "@/components/CreateIntentButton";
import SelectTagButton from "@/components/SelectTagButton";
import AddPatternButton from "@/components/AddPatternButton";
import AddResponseButton from "@/components/AddResponseButton";
import CreateKnowledgeBaseButton from "@/components/CreateKnowledgeBase";

const Intents = () => {
  const [value, setValue] = useState("");

  const { data: intents, isLoading } = useFetchIntents();
  const { data: PTRP, isLoading: isLoadingPTRP } = useFetchPTandRPByTag(value);

  return (
    <Wrapper norMargin title="Intents">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <CreateIntentButton />
          <SelectTagButton
            intents={intents}
            isLoading={isLoading}
            value={value}
            setValue={setValue}
          />
        </div>
        <CreateKnowledgeBaseButton />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Patterns</h1>
            <AddPatternButton value={value} />
          </div>
          <div className="w-full h-[500px] border rounded overflow-scroll p-4">
            <TablePTRP
              isLoadingPTRP={isLoadingPTRP}
              PTRP={PTRP?.patterns}
              itemHead="Pattern"
              caption="A list of pattern."
              tag={value}
            />
          </div>
        </CardHeader>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Responses</h1>
            <AddResponseButton value={value} />
          </div>
          <div className="w-full h-[500px] border rounded overflow-scroll p-4">
            <TablePTRP
              isLoadingPTRP={isLoadingPTRP}
              PTRP={PTRP?.responses}
              itemHead="Response"
              caption="A list of responses."
              tag={value}
            />
          </div>
        </CardHeader>
      </Card>
    </Wrapper>
  );
};

export default Intents;
