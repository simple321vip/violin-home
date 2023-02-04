import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/wiki/api/v1/reader/blogs',
    method: 'get',
    response: () => {
      return [
        {
          bid: "string",
          btId: "string",
          btName: "string",
          title: "string",
          blog_prex: "string",
          content: "string"
        },
        {
          bid: "string",
          btId: "string",
          btName: "string",
          title: "string",
          blog_prex: "string",
          content: "string"
        },
      ]
    }
  },
  {
    url: '/wiki/api/v1/reader/blog/string',
    method: 'get',
    response: () => {
      return {
        bid: "1",
        btId: "2",
        btName: "3",
        title: "1.2 java neicun",
        blog_prex: "5",
        content: "关键字volatile是java虚拟机提供的最轻量级的同步机制。\n当一个变量被定义为volatile时，它具备两种特性。\n第一种是**可见性**。\n即每次get时，强制刷新。\n一个误解区，字节码就是原子操作，这是不对的，一个字节码指令在解释执行时，如果是编译执行，一条字节码会有可能被转化为若干个本地机器指令。此处，用-XX：+PrintAssembly参数输出反汇编来分析。\n\n第二种是，**有序性**。\n即，禁止指令重排序（Instruction Recorder）优化。\n被volatile修饰的变量，赋值后会多执行一个\"lock addl\"操作，这个操作相当于一个memory barrier（内存屏障），指令重拍时，不能把后面的指令排序到内存屏障前面去，只有一个处理器访问时，不需要内存屏障。\naddl 是一个空操作，（把ESP寄存器的值 + 0），这个操作相当于把缓存中的变量做了一次store和write操作。\nlock iddl指令把修改同步到内存时，意味着所有的之前的操作都已完成，便形成了指令重排序无法穿越内存屏障的效果。\n针对于long和double的类型变量，不通虚拟机是有着不同的实现，此处不做描述。\n",
      }
    }
  },
  {
    url: '/wiki/api/v1/reader/blog_type',
    method: 'get',
    response: () => {
      return [
        {
          btId: "string",
          btName: "string",
        },
        {
          btId: "string",
          btName: "string",
        },
      ]
    }
  },
] as MockMethod[]