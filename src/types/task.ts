import { Field, InputType } from "type-graphql";

@InputType()
export class TaskInput {
  @Field()
  taskName: string;

  @Field({defaultValue: false})
  isCompleted: boolean;
}