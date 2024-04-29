import { useState } from "react";

import { IGetIntentsResponse } from "@/api/intents";
import Wrapper from "@/components/Wrapper";
import CreateModelButton from "@/components/CreateModelButton";
import SelectModelVersionButton from "@/components/SelectModelVersionButton";
import SelectTagButton from "@/components/SelectTagButton";
import TablePTRP from "@/components/TablePTRP";
import { Card, CardHeader } from "@/components/ui/card";
import useFetchKnowledgeBase from "@/hooks/useFetchKnowledgeBase";

const Model = () => {
  const [value, setValue] = useState("");
  const [valueTag, setValueTag] = useState("");
  const [tagValue, setTagValue] = useState<IGetIntentsResponse | undefined>();
  const [specKBS, setSpecKBS] = useState<IGetIntentsResponse[] | []>([]);
  const { data: kbs, isLoading } = useFetchKnowledgeBase();

  return (
    <Wrapper title="Model" norMargin>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SelectModelVersionButton
            kbs={kbs}
            isLoading={isLoading}
            value={value}
            setValue={setValue}
            setSpecKBS={setSpecKBS}
            setTagValue={setTagValue}
          />
          <SelectTagButton
            intents={specKBS}
            isLoading={isLoading}
            value={valueTag}
            setValue={setValueTag}
            setTagValue={setTagValue}
            noAction
          />
        </div>
        <CreateModelButton />
      </div>
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Patterns</h1>
          </div>
          <div className="w-full h-[500px] border rounded overflow-scroll p-4">
            <TablePTRP
              isLoadingPTRP={isLoading}
              PTRP={tagValue?.patterns}
              itemHead="Pattern"
              caption="A list of pattern."
              tag={value}
              noAction
            />
          </div>
        </CardHeader>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Responses</h1>
          </div>
          <div className="w-full h-[500px] border rounded overflow-scroll p-4">
            <TablePTRP
              isLoadingPTRP={isLoading}
              PTRP={tagValue?.responses}
              itemHead="Response"
              caption="A list of responses."
              tag={value}
              noAction
            />
          </div>
        </CardHeader>
      </Card>
    </Wrapper>
  );
};

export default Model;
