import { u as updateUser } from '../../../chunks/database_BdggdEyo.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const userCookie = cookies.get("user");
    if (!userCookie) {
      return new Response(
        JSON.stringify({ error: "未登录" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const user = JSON.parse(userCookie.value);
    const body = await request.json();
    const { username, password } = body;
    const updatedUser = await updateUser(user.id, username, password);
    cookies.set("user", JSON.stringify({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username
    }), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });
    return new Response(
      JSON.stringify({ success: true, user: { id: updatedUser.id, email: updatedUser.email, username: updatedUser.username } }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("更新用户信息错误:", error);
    return new Response(
      JSON.stringify({ error: error.message || "服务器内部错误" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
