using MemberManager.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace MemberManager.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
