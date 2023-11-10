import { createLogger, createStore, Store } from "vuex";
import type { InjectionKey } from "vue";
import type { Commit } from "vuex/types/index.js";

export type Category = "제목" | "설명" | "상태" | "날짜";
export interface State {
  category: Category;
  dummyData: {
    todoList: TodoList[];
  };
}

export type Status = "진행전" | "진행중" | "완료";
export type TodoDate = Date[] | null;
export interface TodoList {
  id: string;
  title: string;
  content: string;
  date: TodoDate;
  status: Status;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
  state: {
    category: "제목",
    dummyData: {
      todoList: [
        {
          id: "1",
          title: "커피 사러 가기",
          content: "점심시간에 커피 사러 가기",
          date: ["2023-11-08T12:00:00.000Z"],
          status: "진행전",
        },
        {
          id: "2",
          title: "프로젝트 회의",
          content: "오후 2시에 온라인으로 프로젝트 회의 참석하기",
          date: ["2023-11-08T14:00:00.000Z"],
          status: "진행중",
        },
        {
          id: "3",
          title: "운동하기",
          content: "퇴근 후 30분 동안 집에서 운동하기",
          date: ["2023-11-09T18:00:00.000Z"],
          status: "진행전",
        },
        {
          id: "4",
          title: "저녁 약속",
          content: "친구와 저녁 약속, 7시에 만나기",
          date: ["2023-11-10T19:00:00.000Z"],
          status: "진행전",
        },
        {
          id: "5",
          title: "책 읽기",
          content: "자기 전에 책 읽기 30분",
          date: ["2023-11-11T22:00:00.000Z"],
          status: "완료",
        },
      ],
    },
  },
  mutations: {
    SET_CATEGORY(state: State, category: Category) {
      state.category = category;
    },
    CREATE_TODOLIST(state: State, todo: TodoList) {
      state.dummyData.todoList.push(todo);
    },
    UPDATE_TODOLIST(state: State, todoList: TodoList[]) {
      state.dummyData.todoList = todoList;
    },
  },
  actions: {
    updateTodoList(
      { commit }: { commit: Commit },
      newTodo: TodoList | TodoList[]
    ) {
      if (Array.isArray(newTodo)) {
        console.log("test");
        commit("UPDATE_TODOLIST", newTodo);
      } else {
        console.log("test1");
        commit("CREATE_TODOLIST", newTodo);
      }
    },
  },
  modules: {},
});
